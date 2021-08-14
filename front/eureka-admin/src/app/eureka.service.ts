import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const api = 'http://localhost:8761/eureka';

@Injectable({ providedIn: 'root' })
export class EurekaService {
  constructor(private http: HttpClient) {}

  getAllInstances = () => this.http.get(`${api}/apps`);
  getInstance = (appName: string, instanceId: string) => this.http.get(`${api}/apps/${appName}/${instanceId}`);
  changeStatusInstance = (appName: string, instanceId: string, status: string) => this.http.put(`${api}/apps/${appName}/${instanceId}/status?value=${status}`, null);
  deleteInstance = (appName: string, instanceId: string) => this.http.delete(`${api}/apps/${appName}/${instanceId}`);
}
