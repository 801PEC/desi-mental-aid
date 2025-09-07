import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare,
  Calendar,
  Shield,
  Activity,
  AlertTriangle,
  Eye,
  Lock,
  Download
} from "lucide-react";

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  // Mock analytics data
  const analyticsData = {
    totalUsers: 1247,
    activeSessions: 89,
    forumPosts: 324,
    chatInteractions: 2156,
    avgPHQ9Score: 7.2,
    avgGAD7Score: 6.8
  };

  const phq9Data = [
    { range: "0-4 (None)", count: 156, percentage: 32 },
    { range: "5-9 (Mild)", count: 203, percentage: 42 },
    { range: "10-14 (Moderate)", count: 98, percentage: 20 },
    { range: "15-19 (Severe)", count: 23, percentage: 5 },
    { range: "20-27 (Very Severe)", count: 5, percentage: 1 }
  ];

  const gad7Data = [
    { range: "0-4 (Minimal)", count: 189, percentage: 39 },
    { range: "5-9 (Mild)", count: 198, percentage: 41 },
    { range: "10-14 (Moderate)", count: 76, percentage: 16 },
    { range: "15-21 (Severe)", count: 22, percentage: 4 }
  ];

  const usageOverTime = [
    { month: "Jan", chatSessions: 145, bookings: 23, forumPosts: 67 },
    { month: "Feb", chatSessions: 189, bookings: 31, forumPosts: 89 },
    { month: "Mar", chatSessions: 234, bookings: 42, forumPosts: 112 },
    { month: "Apr", chatSessions: 298, bookings: 38, forumPosts: 156 },
    { month: "May", chatSessions: 367, bookings: 45, forumPosts: 189 },
    { month: "Jun", chatSessions: 423, bookings: 52, forumPosts: 201 }
  ];

  const handleLogin = () => {
    // Simple mock authentication
    if (loginForm.username === "admin" && loginForm.password === "mindcare2024") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Demo credentials: admin / mindcare2024");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 flex items-center justify-center px-4">
        <Card className="card-gentle w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-destructive to-destructive/80 mx-auto mb-4 flex items-center justify-center">
              <Lock className="h-6 w-6 text-destructive-foreground" />
            </div>
            <CardTitle className="text-2xl">Admin Dashboard Access</CardTitle>
            <p className="text-calm">Secure login required for administrative functions</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="Enter password"
              />
            </div>
            <Button onClick={handleLogin} className="btn-primary w-full">
              <Shield className="h-4 w-4 mr-2" />
              Access Dashboard
            </Button>
            <div className="text-center text-xs text-muted-foreground">
              Demo credentials: admin / mindcare2024
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-calm">Mental Health Platform Analytics & Management</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-1">
              <Activity className="h-3 w-3" />
              <span>Live Data</span>
            </Badge>
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
              className="btn-secondary"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-gentle">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+12% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gentle">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.activeSessions}</p>
                </div>
                <Activity className="h-8 w-8 text-success" />
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <Eye className="h-4 w-4 text-primary" />
                <span className="text-sm text-calm">Live users</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gentle">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Forum Posts</p>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.forumPosts}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-warning" />
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+8% this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gentle">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chat Interactions</p>
                  <p className="text-2xl font-bold text-foreground">{analyticsData.chatInteractions}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary-glow" />
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm text-success">+23% this month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="mental-health" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3 mx-auto">
            <TabsTrigger value="mental-health">Mental Health Metrics</TabsTrigger>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>

          <TabsContent value="mental-health" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* PHQ-9 Distribution */}
              <Card className="card-gentle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <span>PHQ-9 Score Distribution</span>
                  </CardTitle>
                  <p className="text-sm text-calm">Depression screening scores over last 30 days</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Average Score:</span>
                    <Badge variant="outline">{analyticsData.avgPHQ9Score}</Badge>
                  </div>
                  {phq9Data.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.range}</span>
                        <span>{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* GAD-7 Distribution */}
              <Card className="card-gentle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-success" />
                    <span>GAD-7 Score Distribution</span>
                  </CardTitle>
                  <p className="text-sm text-calm">Anxiety screening scores over last 30 days</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Average Score:</span>
                    <Badge variant="outline">{analyticsData.avgGAD7Score}</Badge>
                  </div>
                  {gad7Data.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.range}</span>
                        <span>{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card className="card-gentle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Platform Usage Over Time</span>
                </CardTitle>
                <p className="text-sm text-calm">User engagement trends across all services</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {usageOverTime.map((month, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{month.month} 2024</span>
                        <div className="flex space-x-4 text-sm">
                          <span className="text-primary">Chat: {month.chatSessions}</span>
                          <span className="text-success">Bookings: {month.bookings}</span>
                          <span className="text-warning">Forum: {month.forumPosts}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-1 h-4">
                        <div 
                          className="bg-primary rounded"
                          style={{ height: `${(month.chatSessions / 500) * 100}%` }}
                        />
                        <div 
                          className="bg-success rounded"
                          style={{ height: `${(month.bookings / 60) * 100}%` }}
                        />
                        <div 
                          className="bg-warning rounded"
                          style={{ height: `${(month.forumPosts / 250) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-gentle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-warning" />
                    <span>Pending Moderation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-warning/5 rounded-lg">
                    <span>Forum Posts</span>
                    <Badge variant="outline">3 pending</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span>User Reports</span>
                    <Badge variant="outline">1 pending</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-success/5 rounded-lg">
                    <span>Resource Submissions</span>
                    <Badge variant="outline">2 pending</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gentle">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span>Crisis Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">High-risk language detected</span>
                      <Badge variant="destructive">Urgent</Badge>
                    </div>
                    <p className="text-sm text-calm">Chat session flagged for immediate review</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="text-center text-sm text-success">
                    ✓ All other systems normal
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Export Data */}
        <Card className="card-gentle mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-primary" />
              <span>Data Export</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="btn-secondary">
                Export Mental Health Analytics
              </Button>
              <Button variant="outline" className="btn-secondary">
                Export Usage Statistics
              </Button>
              <Button variant="outline" className="btn-secondary">
                Export User Reports
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              All exported data is anonymized and complies with privacy regulations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;