import { useLeads, useLeadStats } from "@/hooks/use-leads";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Loader2, Users, TrendingUp, DollarSign, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from "date-fns";

export default function Admin() {
  const { data: leads, isLoading: leadsLoading, error: leadsError, refetch: refetchLeads } = useLeads();
  const { data: stats, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useLeadStats();

  const handleLogin = () => {
    const password = prompt("Enter Admin Password:");
    if (password) {
      sessionStorage.setItem("admin_password", password);
      refetchLeads();
      refetchStats();
    }
  };

  if (leadsError?.message === "Unauthorized" || statsError?.message === "Unauthorized") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>Please enter the administrator password to view this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleLogin} className="w-full">Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (leadsLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const chartData = stats?.byInterest ? Object.entries(stats.byInterest).map(([name, value]) => ({
    name: name.replace('_', ' ').toUpperCase(),
    value
  })) : [];

  const demandLevel = !stats ? 'Unknown' : 
    stats.total >= 50 ? 'Strong' : 
    stats.total >= 20 ? 'Medium' : 'Weak';
  
  const demandColor = !stats ? 'text-gray-500' : 
    stats.total >= 50 ? 'text-green-600' : 
    stats.total >= 20 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-muted/20 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-display tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Market validation overview for Staplehurst Workspace.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border shadow-sm">
            <span className="text-sm font-medium text-muted-foreground mr-2">Total Interest:</span>
            <span className="text-2xl font-bold text-foreground">{stats?.total || 0}</span>
          </div>
        </div>

        {/* Business Case Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estimated Market Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">200-300</div>
              <p className="text-xs text-muted-foreground">Targetable remote workers in Staplehurst</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Demand Signal</CardTitle>
              <TrendingUp className={`h-4 w-4 ${demandColor}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${demandColor}`}>{demandLevel}</div>
              <p className="text-xs text-muted-foreground">
                Target: 50+ signups for strong validation
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue Potential</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£3k - £4k</div>
              <p className="text-xs text-muted-foreground">Based on 10 full-time + 10 part-time members</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Interest by Plan Type</CardTitle>
              <CardDescription>Breakdown of which membership tiers potential customers prefer.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#10B981', '#F59E0B', '#3B82F6', '#6366F1'][index % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pricing Logic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing Logic</CardTitle>
              <CardDescription>Why these prices work for the area.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Benchmark</AlertTitle>
                <AlertDescription>
                  Day rate £20 is standard for rural hubs. 
                </AlertDescription>
              </Alert>
              <div className="text-sm space-y-2 text-muted-foreground">
                <p>
                  <strong>Competitor Analysis:</strong> Nearest hub is in Maidstone (£25/day). We undercut slightly to attract locals.
                </p>
                <p>
                  <strong>Value Prop:</strong> Annual commute to London is ~£5,000+. Our Full-Time plan is £3,000/yr.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Signups Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Signups</CardTitle>
            <CardDescription>Latest people who joined the waitlist.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Interest</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {leads?.map((lead) => (
                    <tr key={lead.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">{lead.name}</td>
                      <td className="p-4 align-middle">{lead.email}</td>
                      <td className="p-4 align-middle capitalize">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${lead.interestLevel === 'full_time' ? 'bg-blue-100 text-blue-800' : 
                            lead.interestLevel === 'part_time' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {lead.interestLevel.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 align-middle text-muted-foreground">
                        {lead.createdAt && format(new Date(lead.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="p-4 align-middle text-muted-foreground max-w-xs truncate" title={lead.comments || ""}>
                        {lead.comments || "-"}
                      </td>
                    </tr>
                  ))}
                  {leads?.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-muted-foreground">No signups yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
