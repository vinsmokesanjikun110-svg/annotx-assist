import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, CheckCircle2, Clock, FolderOpen, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { label: "Active Projects", value: "12", icon: FolderOpen, color: "text-primary" },
    { label: "Annotations Today", value: "847", icon: Activity, color: "text-success" },
    { label: "Pending Review", value: "23", icon: Clock, color: "text-warning" },
    { label: "Completed", value: "1,240", icon: CheckCircle2, color: "text-success" },
  ];

  const projects = [
    { id: 1, name: "Chest X-Ray Pneumonia Detection", images: 450, annotated: 340, accuracy: 94.2, status: "Active" },
    { id: 2, name: "CT Lung Nodule Segmentation", images: 230, annotated: 230, accuracy: 91.8, status: "Review" },
    { id: 3, name: "MRI Brain Tumor Classification", images: 180, annotated: 95, accuracy: 88.5, status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-medical-purple flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold">AnnotateRx</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Users className="w-4 h-4" />
              Team
            </Button>
            <Button variant="medical" size="sm">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Monitor your annotation projects and performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 card-elevated border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 card-elevated border-border/50 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Recent Projects</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-3">
            {projects.map((project) => (
              <Link key={project.id} to={`/annotate/${project.id}`}>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium group-hover:text-primary transition-colors">{project.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'Active' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div>
                      <span className="block text-foreground font-medium">{project.images}</span>
                      Total Images
                    </div>
                    <div>
                      <span className="block text-foreground font-medium">{project.annotated}/{project.images}</span>
                      Annotated
                    </div>
                    <div>
                      <span className="block text-success font-medium">{project.accuracy}%</span>
                      AI Accuracy
                    </div>
                  </div>
                  <div className="mt-3 bg-muted rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-medical-purple transition-all"
                      style={{ width: `${(project.annotated / project.images) * 100}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
