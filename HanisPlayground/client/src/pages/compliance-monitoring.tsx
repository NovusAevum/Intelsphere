import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lock, Shield, AlertTriangle, CheckCircle, Users, 
  Download, Search, Eye, Clock, FileText
} from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export default function ComplianceMonitoring() {
  const [complianceQuery, setComplianceQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const complianceAnalysis = useMutation({
    mutationFn: async (data: { query: string }) => {
      const response = await fetch('/api/compliance-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: () => {
      setIsAnalyzing(false);
    }
  });

  const handleComplianceAnalysis = () => {
    if (complianceQuery.trim()) {
      setIsAnalyzing(true);
      complianceAnalysis.mutate({ query: complianceQuery });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-stone-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-400 to-stone-300 bg-clip-text text-transparent mb-4">
            Privacy & Ethical Compliance Monitoring
          </h1>
          <p className="text-slate-300 text-lg">
            GDPR/CCPA compliance, consent tracking, and digital footprint monitoring
          </p>
        </div>

        {/* Compliance Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Compliance Score</p>
                  <p className="text-2xl font-bold text-green-400">94.7%</p>
                  <p className="text-green-400 text-xs">Excellent rating</p>
                </div>
                <Shield className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Violations</p>
                  <p className="text-2xl font-bold text-red-400">3</p>
                  <p className="text-red-400 text-xs">Require immediate attention</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Data Subjects</p>
                  <p className="text-2xl font-bold text-blue-400">12,847</p>
                  <p className="text-blue-400 text-xs">Under monitoring</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Audit Readiness</p>
                  <p className="text-2xl font-bold text-purple-400">98%</p>
                  <p className="text-purple-400 text-xs">Fully prepared</p>
                </div>
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-600">Compliance Overview</TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-gray-600">Privacy Management</TabsTrigger>
            <TabsTrigger value="consent" className="data-[state=active]:bg-gray-600">Consent Tracking</TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-gray-600">Digital Footprint</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Lock className="h-5 w-5 text-gray-400" />
                  Compliance Intelligence Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Enter compliance query, regulation, or data protection concern..."
                    value={complianceQuery}
                    onChange={(e) => setComplianceQuery(e.target.value)}
                    className="flex-1 bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && handleComplianceAnalysis()}
                  />
                  <Button 
                    onClick={handleComplianceAnalysis}
                    disabled={complianceAnalysis.isPending || isAnalyzing}
                    className="bg-gradient-to-r from-gray-600 to-stone-600 hover:from-gray-700 hover:to-stone-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze Compliance
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Regulatory Compliance Status</h4>
                    <div className="space-y-3">
                      {[
                        { regulation: 'GDPR (EU)', score: 96, status: 'Compliant', issues: 1 },
                        { regulation: 'CCPA (California)', score: 92, status: 'Compliant', issues: 2 },
                        { regulation: 'PIPEDA (Canada)', score: 98, status: 'Compliant', issues: 0 },
                        { regulation: 'SOC 2 Type II', score: 89, status: 'In Progress', issues: 3 },
                        { regulation: 'ISO 27001', score: 94, status: 'Compliant', issues: 1 }
                      ].map((reg, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-white font-medium">{reg.regulation}</h5>
                            <Badge 
                              variant="outline" 
                              className={reg.status === 'Compliant' ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                            >
                              {reg.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400 text-sm">Compliance Score</span>
                              <span className="text-gray-400 text-sm">{reg.score}%</span>
                            </div>
                            <Progress value={reg.score} className="h-2" />
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-400">Outstanding Issues: {reg.issues}</span>
                              {reg.issues === 0 ? (
                                <CheckCircle className="h-3 w-3 text-green-400" />
                              ) : (
                                <AlertTriangle className="h-3 w-3 text-yellow-400" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Recent Compliance Activities</h4>
                    <div className="space-y-3">
                      {[
                        {
                          activity: 'Data retention policy updated',
                          type: 'Policy Update',
                          time: '2 hours ago',
                          impact: 'Low'
                        },
                        {
                          activity: 'GDPR subject access request processed',
                          type: 'Data Request',
                          time: '1 day ago',
                          impact: 'Medium'
                        },
                        {
                          activity: 'Security audit completed',
                          type: 'Audit',
                          time: '3 days ago',
                          impact: 'High'
                        },
                        {
                          activity: 'Cookie consent mechanism updated',
                          type: 'Technical Update',
                          time: '1 week ago',
                          impact: 'Medium'
                        }
                      ].map((activity, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-white text-sm">{activity.activity}</p>
                            <Badge 
                              variant="outline" 
                              className={
                                activity.impact === 'High' ? 'border-red-500 text-red-300' :
                                activity.impact === 'Medium' ? 'border-yellow-500 text-yellow-300' :
                                'border-green-500 text-green-300'
                              }
                            >
                              {activity.impact}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-xs">{activity.type}</span>
                            <span className="text-slate-400 text-xs">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Data Protection Impact Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        assessment: 'Customer Analytics Platform',
                        risk: 'Medium',
                        status: 'Completed',
                        date: '2025-05-15'
                      },
                      {
                        assessment: 'Marketing Automation System',
                        risk: 'Low',
                        status: 'In Review',
                        date: '2025-06-01'
                      },
                      {
                        assessment: 'Employee Monitoring Tools',
                        risk: 'High',
                        status: 'Pending',
                        date: '2025-06-15'
                      }
                    ].map((dpia, index) => (
                      <div key={index} className="p-3 bg-slate-700/50 rounded">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="text-white font-medium">{dpia.assessment}</h5>
                          <Badge 
                            variant="outline" 
                            className={
                              dpia.status === 'Completed' ? 'border-green-500 text-green-300' :
                              dpia.status === 'In Review' ? 'border-yellow-500 text-yellow-300' :
                              'border-red-500 text-red-300'
                            }
                          >
                            {dpia.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Risk Level</p>
                            <p className={`font-semibold ${
                              dpia.risk === 'High' ? 'text-red-400' :
                              dpia.risk === 'Medium' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>{dpia.risk}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Due Date</p>
                            <p className="text-white">{dpia.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Data Subject Rights Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Requests This Month</p>
                        <p className="text-2xl font-bold text-blue-400">47</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Avg Response Time</p>
                        <p className="text-2xl font-bold text-green-400">2.3</p>
                        <p className="text-green-400 text-xs">Days</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold">Request Types</h5>
                      {[
                        { type: 'Access Requests', count: 23, percentage: 49 },
                        { type: 'Deletion Requests', count: 12, percentage: 26 },
                        { type: 'Portability Requests', count: 8, percentage: 17 },
                        { type: 'Rectification Requests', count: 4, percentage: 8 }
                      ].map((request, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300 text-sm">{request.type}</span>
                            <span className="text-gray-400 text-sm">{request.count}</span>
                          </div>
                          <Progress value={request.percentage} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="consent">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Consent Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Opt-in Rate</p>
                        <p className="text-2xl font-bold text-green-400">78%</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Active Consents</p>
                        <p className="text-2xl font-bold text-blue-400">9,847</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded">
                        <p className="text-slate-400 text-sm">Withdrawals</p>
                        <p className="text-2xl font-bold text-yellow-400">234</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Consent Categories</h5>
                      {[
                        { category: 'Marketing Communications', consents: 7234, rate: 73 },
                        { category: 'Analytics & Performance', consents: 8901, rate: 90 },
                        { category: 'Personalization', consents: 6543, rate: 66 },
                        { category: 'Third-party Sharing', consents: 4321, rate: 44 }
                      ].map((consent, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{consent.category}</span>
                            <div className="text-right">
                              <p className="text-gray-400 text-sm">{consent.consents.toLocaleString()}</p>
                              <p className="text-slate-400 text-xs">{consent.rate}% opt-in</p>
                            </div>
                          </div>
                          <Progress value={consent.rate} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Cookie Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-700/50 rounded">
                      <h5 className="text-white font-semibold mb-2">Cookie Banner Performance</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">Banner Views</p>
                          <p className="text-white font-semibold">23,456</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Acceptance Rate</p>
                          <p className="text-green-400 font-semibold">67.8%</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h5 className="text-white font-semibold">Cookie Categories</h5>
                      {[
                        { category: 'Strictly Necessary', status: 'Always Active', count: 12 },
                        { category: 'Performance', status: 'Opt-in Required', count: 8 },
                        { category: 'Functional', status: 'Opt-in Required', count: 6 },
                        { category: 'Targeting', status: 'Opt-in Required', count: 15 }
                      ].map((cookie, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                          <div>
                            <p className="text-white font-medium">{cookie.category}</p>
                            <p className="text-slate-400 text-xs">{cookie.count} cookies</p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={cookie.status === 'Always Active' ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                          >
                            {cookie.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Digital Footprint Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Data Processing Activities</h4>
                    <div className="space-y-3">
                      {[
                        {
                          activity: 'Customer Data Collection',
                          purpose: 'Service Delivery',
                          lawful_basis: 'Contract',
                          retention: '7 years',
                          status: 'Active'
                        },
                        {
                          activity: 'Marketing Analytics',
                          purpose: 'Business Intelligence',
                          lawful_basis: 'Legitimate Interest',
                          retention: '3 years',
                          status: 'Active'
                        },
                        {
                          activity: 'Employee Monitoring',
                          purpose: 'Security & Performance',
                          lawful_basis: 'Legitimate Interest',
                          retention: '2 years',
                          status: 'Under Review'
                        }
                      ].map((activity, index) => (
                        <div key={index} className="p-3 bg-slate-700/50 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-medium">{activity.activity}</h5>
                            <Badge 
                              variant="outline" 
                              className={activity.status === 'Active' ? 'border-green-500 text-green-300' : 'border-yellow-500 text-yellow-300'}
                            >
                              {activity.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <p className="text-slate-400">Purpose</p>
                              <p className="text-slate-300">{activity.purpose}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Lawful Basis</p>
                              <p className="text-slate-300">{activity.lawful_basis}</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Retention Period</p>
                              <p className="text-slate-300">{activity.retention}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Security Monitoring</h4>
                    <div className="space-y-3">
                      {[
                        {
                          check: 'Data Encryption at Rest',
                          status: 'Compliant',
                          last_check: '1 hour ago'
                        },
                        {
                          check: 'Access Control Review',
                          status: 'Compliant',
                          last_check: '24 hours ago'
                        },
                        {
                          check: 'Data Backup Integrity',
                          status: 'Warning',
                          last_check: '6 hours ago'
                        },
                        {
                          check: 'Third-party Processor Audit',
                          status: 'Pending',
                          last_check: '1 week ago'
                        }
                      ].map((check, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                          <div>
                            <p className="text-white font-medium">{check.check}</p>
                            <p className="text-slate-400 text-xs">Last checked: {check.last_check}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant="outline" 
                              className={
                                check.status === 'Compliant' ? 'border-green-500 text-green-300' :
                                check.status === 'Warning' ? 'border-yellow-500 text-yellow-300' :
                                'border-red-500 text-red-300'
                              }
                            >
                              {check.status}
                            </Badge>
                            {check.status === 'Compliant' ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-400" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button className="bg-gradient-to-r from-gray-600 to-stone-600 hover:from-gray-700 hover:to-stone-700">
            <Download className="h-4 w-4 mr-2" />
            Export Compliance Report
          </Button>
        </div>
      </div>
    </div>
  );
}