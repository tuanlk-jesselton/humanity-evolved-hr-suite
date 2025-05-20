import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../../entities/company.entity';
import { User } from '../../auth/entities/user.entity';
import { SubscriptionPlan } from '../subscription/entities/subscription-plan.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SubscriptionPlan)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlan>,
  ) {}

  async getPlatformStats() {
    try {
      const [totalCompanies, totalUsers] = await Promise.all([
        this.companyRepository.count(),
        this.userRepository
          .createQueryBuilder('user')
          .where('user.isActive = :isActive', { isActive: true })
          .getCount(),
      ]);

      // Count active companies (companies with active users)
      const activeCompanies = await this.companyRepository
        .createQueryBuilder('company')
        .innerJoin('company.users', 'user', 'user.isActive = :isActive', { isActive: true })
        .getCount();

      return [
        { 
          title: 'Total Companies', 
          value: totalCompanies.toString(),
          change: '+0', // This would come from comparing with previous period
          changeType: 'positive'
        },
        { 
          title: 'Total Users', 
          value: totalUsers.toString(),
          change: '+0', // This would come from comparing with previous period
          changeType: 'positive'
        },
        { 
          title: 'Active Companies', 
          value: activeCompanies.toString(),
          change: '+0', // This would come from comparing with previous period
          changeType: 'positive'
        },
        { 
          title: 'System Health', 
          value: '99.9%', // This would come from system monitoring
          change: '+0.1%',
          changeType: 'positive'
        }
      ];
    } catch (error) {
      console.error('Error getting platform stats:', error);
      throw error;
    }
  }

  async getCompanies() {
    try {
      return await this.companyRepository
        .createQueryBuilder('company')
        .select([
          'company.id',
          'company.name',
          'company.created_at',
          'company.updated_at',
        ])
        .orderBy('company.name', 'ASC')
        .getMany();
    } catch (error) {
      console.error('Error getting companies:', error);
      throw error;
    }
  }

  async getSystemAlerts() {
    try {
      // In a real application, this would fetch from a system alerts/logs table
      // For now, return some mock data
      return [
        { 
          id: 1, 
          type: 'warning',
          message: 'Scheduled maintenance this weekend',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        { 
          id: 2, 
          type: 'error',
          message: 'High server load detected',
          timestamp: new Date().toISOString(),
        },
      ];
    } catch (error) {
      console.error('Error getting system alerts:', error);
      throw error;
    }
  }
}
