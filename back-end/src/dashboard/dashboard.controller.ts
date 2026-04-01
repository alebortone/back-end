import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/passport_jwt/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {

  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboard(@Request() req) {
    const userId = req.user.userId; 
    return this.dashboardService.getData(userId);
  }
}
