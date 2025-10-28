import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ArrowLeft, CheckCircle2, TrendingUp, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Metrics = () => {
  const classMetrics = [
    { name: "Pneumothorax", precision: 94.2, recall: 92.8, f1: 93.5, samples: 340 },
    { name: "Nodule", precision: 91.8, recall: 89.3, f1: 90.5, samples: 280 },
    { name: "Effusion", precision: 88.5, recall: 86.1, f1: 87.3, samples: 195 },
    { name: "Consolidation", precision: 85.3, recall: 83.7, f1: 84.5, samples: 165 },
  ];

  const annotatorStats = [
    { name: "Dr. Sarah Chen", annotations: 245, avgTime: "4.2 min", accuracy: 96.8 },
    { name: "Dr. Mike Ross", annotations: 198, avgTime: "5.1 min", accuracy: 94.2 },
    { name: "Dr. Emily Park", annotations: 176, avgTime: "3.8 min", accuracy: 97.1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Model Performance Metrics</h1>
              <p className="text-xs text-muted-foreground">Chest X-Ray Pneumonia Detection</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Overall Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Overall Accuracy", value: "92.4%", icon: CheckCircle2, color: "text-success" },
            { label: "Avg Precision", value: "89.9%", icon: TrendingUp, color: "text-primary" },
            { label: "Avg Recall", value: "88.0%", icon: Activity, color: "text-primary" },
            { label: "Avg F1 Score", value: "88.9%", icon: Activity, color: "text-success" },
          ].map((stat) => (
            <Card key={stat.label} className="p-6 card-elevated border-border/50 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Per-Class Metrics */}
        <Card className="p-6 card-elevated border-border/50 bg-card/80 backdrop-blur-sm mb-8">
          <h3 className="text-xl font-semibold mb-6">Per-Class Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Class</th>
                  <th className="pb-3 font-medium">Precision</th>
                  <th className="pb-3 font-medium">Recall</th>
                  <th className="pb-3 font-medium">F1 Score</th>
                  <th className="pb-3 font-medium">Samples</th>
                  <th className="pb-3 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {classMetrics.map((cls, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-4 font-medium">{cls.name}</td>
                    <td className="py-4">
                      <span className={cls.precision >= 90 ? 'text-success' : 'text-warning'}>
                        {cls.precision}%
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={cls.recall >= 90 ? 'text-success' : 'text-warning'}>
                        {cls.recall}%
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={cls.f1 >= 90 ? 'text-success font-medium' : 'text-warning'}>
                        {cls.f1}%
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">{cls.samples}</td>
                    <td className="py-4">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-success"
                          style={{ width: `${cls.f1}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Annotator Performance */}
        <Card className="p-6 card-elevated border-border/50 bg-card/80 backdrop-blur-sm mb-8">
          <h3 className="text-xl font-semibold mb-6">Annotator Throughput</h3>
          <div className="space-y-4">
            {annotatorStats.map((annotator, i) => (
              <div key={i} className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{annotator.name}</h4>
                  <span className="text-success font-medium">{annotator.accuracy}% accuracy</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="block text-foreground font-medium">{annotator.annotations}</span>
                    Total Annotations
                  </div>
                  <div>
                    <span className="block text-foreground font-medium">{annotator.avgTime}</span>
                    Avg Time per Image
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Confusion Matrix Preview */}
        <Card className="p-6 card-elevated border-border/50 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Confusion Matrix</h3>
            <Button variant="outline" size="sm">View Full Matrix</Button>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-sm">
            <div className="p-3 font-medium text-muted-foreground">Predicted →<br />Actual ↓</div>
            {classMetrics.map((cls) => (
              <div key={cls.name} className="p-3 font-medium text-muted-foreground">
                {cls.name.slice(0, 10)}
              </div>
            ))}
            {classMetrics.map((actual) => (
              <>
                <div className="p-3 font-medium text-muted-foreground">{actual.name.slice(0, 10)}</div>
                {classMetrics.map((predicted, i) => (
                  <div 
                    key={i}
                    className={`p-3 rounded ${
                      actual.name === predicted.name 
                        ? 'bg-success/20 text-success font-bold' 
                        : 'bg-muted/30 text-muted-foreground'
                    }`}
                  >
                    {actual.name === predicted.name ? Math.floor(actual.recall) : Math.floor(Math.random() * 8)}
                  </div>
                ))}
              </>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Metrics;
