import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, ArrowRight, CheckCircle2, Lock, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Assisted Annotation",
      description: "Get instant segmentation and classification suggestions powered by state-of-the-art models"
    },
    {
      icon: Zap,
      title: "10× Faster Workflow",
      description: "Reduce annotation time from hours to minutes with smart tools and automation"
    },
    {
      icon: CheckCircle2,
      title: "Built-in Quality Control",
      description: "Multi-stage review workflows with consensus tracking and version control"
    },
    {
      icon: Lock,
      title: "Regulatory Ready",
      description: "Complete audit trails, encryption, and de-identification for FDA compliance"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--medical-blue)/0.15),transparent_50%),radial-gradient(circle_at_70%_50%,hsl(var(--medical-purple)/0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-6 pt-20 pb-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Medical Image Labeling</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Annotate Medical Images{" "}
              <span className="text-gradient">10× Faster</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A secure, cloud-native platform that supercharges medical image annotation with AI-assisted 
              segmentation, collaborative review workflows, and full audit trails.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button variant="medical" size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                FDA Ready
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                SOC 2 Type II
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Built for Radiologists, Powered by AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create high-quality labeled datasets for medical AI training
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="p-6 card-elevated border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-medical-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="p-12 card-elevated border-border/50 bg-gradient-to-br from-card/80 to-secondary/30 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">10×</div>
              <div className="text-muted-foreground">Faster Annotation</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">94%</div>
              <div className="text-muted-foreground">Average AI Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">100%</div>
              <div className="text-muted-foreground">Audit Trail Coverage</div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 mb-20">
        <Card className="p-12 card-elevated border-primary/20 bg-gradient-to-br from-primary/10 to-medical-purple/5 backdrop-blur-sm text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Annotation Workflow?</h2>
            <p className="text-muted-foreground mb-8">
              Join leading medical institutions using AnnotateRx to build high-quality training datasets
            </p>
            <Link to="/dashboard">
              <Button variant="medical" size="lg" className="gap-2">
                Start Annotating Today
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Index;
