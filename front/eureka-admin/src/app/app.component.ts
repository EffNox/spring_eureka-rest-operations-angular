import { Component, OnInit } from '@angular/core';
import { EurekaService } from './eureka.service';

@Component({ selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss'] })
export class AppComponent implements OnInit {
  title = 'EUREKA-ADMIN';
  displayedColumns: string[] = ['n', 'instanceId', 'homePageUrl', 'status', 'actions'];
  dataSource: any = [];
  instanceInfo: any = {};

  constructor(private svEureka: EurekaService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll = () => this.svEureka.getAllInstances().subscribe((v: any) => (this.dataSource = v.applications.application));

  get = (name: string, instanceId: string) => {
    this.svEureka.getInstance(name, instanceId).subscribe((v: any) => (this.instanceInfo = v.instance));
  };

  changeStatus = (name: string, instanceId: string, status: string) => {
    this.svEureka.changeStatusInstance(name.toLowerCase(), instanceId, status).subscribe(v => {
      window.open('http://localhost:8761', '_blank');
      setTimeout(() => this.getAll(), 15000);
    });
  };

  deletee = (name: string, instanceId: string) => {
    this.svEureka.deleteInstance(name, instanceId).subscribe(v => {
      window.open('http://localhost:8761', '_blank');
      setTimeout(() => this.getAll(), 15000);
    });
  };
}
