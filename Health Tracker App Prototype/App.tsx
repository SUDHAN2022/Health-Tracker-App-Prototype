import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card } from "./components/ui/card";
import { MetricCard } from "./components/MetricCard";
import { MetricInput } from "./components/MetricInput";
import { AnalyticsChart } from "./components/AnalyticsChart";
import { WeeklySummary } from "./components/WeeklySummary";
import { Activity, Moon, Droplets, Weight, BarChart3, Calendar, Target } from "lucide-react";

export default function App() {
  // Current day metrics
  const [metrics, setMetrics] = useState({
    steps: 8420,
    sleep: 7.5,
    water: 6,
    weight: 165.2
  });

  // Targets
  const targets = {
    steps: 10000,
    sleep: 8,
    water: 8,
    weight: 160
  };

  // Mock data for charts
  const generateWeekData = (base: number, variance: number) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      date: day,
      value: Math.round(base + (Math.random() - 0.5) * variance)
    }));
  };

  const chartData = {
    steps: generateWeekData(8500, 3000).map(item => ({ ...item, target: targets.steps })),
    sleep: generateWeekData(7.2, 2).map(item => ({ ...item, value: Math.max(5, Math.min(9, item.value)), target: targets.sleep })),
    water: generateWeekData(6.5, 3).map(item => ({ ...item, value: Math.max(0, Math.min(12, item.value)), target: targets.water })),
    weight: generateWeekData(165, 2).map(item => ({ ...item, target: targets.weight }))
  };

  // Weekly summary data
  const weeklyData = {
    steps: { current: 58940, target: 70000, previous: 52100 },
    sleep: { current: 51, target: 56, previous: 48 },
    water: { current: 45, target: 56, previous: 41 },
    weight: { current: 164.8, target: 160, previous: 166.2 }
  };

  const updateMetric = (metric: keyof typeof metrics, value: number) => {
    setMetrics(prev => ({ ...prev, [metric]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-medium mb-2">Health Tracker</h1>
        <p className="text-muted-foreground">Track your daily health metrics and progress</p>
      </header>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="input" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Input
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Weekly
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Steps"
              value={metrics.steps}
              unit="steps"
              target={targets.steps}
              icon={<Activity className="h-4 w-4 text-white" />}
              color="bg-blue-500"
            />
            <MetricCard
              title="Sleep"
              value={metrics.sleep}
              unit="hours"
              target={targets.sleep}
              icon={<Moon className="h-4 w-4 text-white" />}
              color="bg-purple-500"
            />
            <MetricCard
              title="Water"
              value={metrics.water}
              unit="glasses"
              target={targets.water}
              icon={<Droplets className="h-4 w-4 text-white" />}
              color="bg-cyan-500"
            />
            <MetricCard
              title="Weight"
              value={metrics.weight}
              unit="lbs"
              target={targets.weight}
              icon={<Weight className="h-4 w-4 text-white" />}
              color="bg-amber-500"
            />
          </div>

          <Card className="p-6">
            <h2 className="font-medium mb-4">Today's Progress</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">ACTIVITY</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Steps taken</span>
                    <span className="font-medium">{metrics.steps.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Calories burned</span>
                    <span className="font-medium">{Math.round(metrics.steps * 0.04)} kcal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Distance walked</span>
                    <span className="font-medium">{(metrics.steps * 0.0008).toFixed(1)} km</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">WELLNESS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Sleep quality</span>
                    <span className="font-medium">{metrics.sleep >= 7 ? "Good" : "Fair"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Hydration level</span>
                    <span className="font-medium">{metrics.water >= 6 ? "Good" : "Low"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>BMI</span>
                    <span className="font-medium">{((metrics.weight / 2.205) / Math.pow(1.75, 2)).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="input" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <MetricInput
              title="Steps"
              value={metrics.steps}
              unit="steps"
              icon={<Activity className="h-4 w-4 text-white" />}
              color="bg-blue-500"
              step={100}
              onUpdate={(value) => updateMetric('steps', value)}
            />
            <MetricInput
              title="Sleep"
              value={metrics.sleep}
              unit="hours"
              icon={<Moon className="h-4 w-4 text-white" />}
              color="bg-purple-500"
              step={0.5}
              onUpdate={(value) => updateMetric('sleep', value)}
            />
            <MetricInput
              title="Water"
              value={metrics.water}
              unit="glasses"
              icon={<Droplets className="h-4 w-4 text-white" />}
              color="bg-cyan-500"
              step={1}
              onUpdate={(value) => updateMetric('water', value)}
            />
            <MetricInput
              title="Weight"
              value={metrics.weight}
              unit="lbs"
              icon={<Weight className="h-4 w-4 text-white" />}
              color="bg-amber-500"
              step={0.1}
              onUpdate={(value) => updateMetric('weight', value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Daily Steps"
              data={chartData.steps}
              color="#3b82f6"
              type="bar"
              unit="steps"
            />
            <AnalyticsChart
              title="Sleep Duration"
              data={chartData.sleep}
              color="#8b5cf6"
              type="line"
              unit="hours"
            />
            <AnalyticsChart
              title="Water Intake"
              data={chartData.water}
              color="#06b6d4"
              type="area"
              unit="glasses"
            />
            <AnalyticsChart
              title="Weight Tracking"
              data={chartData.weight}
              color="#f59e0b"
              type="line"
              unit="lbs"
            />
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <WeeklySummary weekData={weeklyData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}