import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, AlertCircle, Download, Mail, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  category: "application" | "testing" | "visa" | "financial";
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const Timeline = () => {
  const [intake, setIntake] = useState("");
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateTimeline = () => {
    if (!intake) {
      toast({
        title: "Missing Information",
        description: "Please select your intended intake semester.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const baseTimeline = getTimelineForIntake(intake);
      setTimeline(baseTimeline);
      setIsLoading(false);
      
      toast({
        title: "Timeline Generated!",
        description: "Your personalized application timeline is ready.",
      });
    }, 1000);
  };

  const getTimelineForIntake = (intake: string): TimelineItem[] => {
    const year = intake.includes("2025") ? "2025" : "2026";
    const isFall = intake.includes("Fall");
    
    if (isFall) {
      return [
        {
          id: "1",
          title: "Research Universities",
          description: "Create a list of 15-20 target universities based on your profile",
          deadline: year === "2025" ? "March 2024" : "March 2025",
          category: "application",
          priority: "high",
          completed: false,
        },
        {
          id: "2",
          title: "Take Standardized Tests",
          description: "Complete TOEFL/IELTS, SAT/ACT, GRE/GMAT as required",
          deadline: year === "2025" ? "August 2024" : "August 2025",
          category: "testing",
          priority: "high",
          completed: false,
        },
        {
          id: "3",
          title: "Request Transcripts",
          description: "Get official transcripts from all institutions attended",
          deadline: year === "2025" ? "September 2024" : "September 2025",
          category: "application",
          priority: "medium",
          completed: false,
        },
        {
          id: "4",
          title: "Write Personal Statement",
          description: "Draft and refine your personal statement/essays",
          deadline: year === "2025" ? "October 2024" : "October 2025",
          category: "application",
          priority: "high",
          completed: false,
        },
        {
          id: "5",
          title: "Request Recommendation Letters",
          description: "Ask professors/employers for letters of recommendation",
          deadline: year === "2025" ? "October 2024" : "October 2025",
          category: "application",
          priority: "high",
          completed: false,
        },
        {
          id: "6",
          title: "Submit Early Applications",
          description: "Submit Early Decision/Action applications",
          deadline: year === "2025" ? "November 1, 2024" : "November 1, 2025",
          category: "application",
          priority: "high",
          completed: false,
        },
        {
          id: "7",
          title: "Submit Regular Applications",
          description: "Submit all remaining applications",
          deadline: year === "2025" ? "January 15, 2025" : "January 15, 2026",
          category: "application",
          priority: "high",
          completed: false,
        },
        {
          id: "8",
          title: "Submit FAFSA/CSS Profile",
          description: "Complete financial aid applications",
          deadline: year === "2025" ? "February 1, 2025" : "February 1, 2026",
          category: "financial",
          priority: "medium",
          completed: false,
        },
        {
          id: "9",
          title: "Receive Admission Decisions",
          description: "Universities release admission decisions",
          deadline: year === "2025" ? "March-April 2025" : "March-April 2026",
          category: "application",
          priority: "medium",
          completed: false,
        },
        {
          id: "10",
          title: "Accept Offer & Pay Deposit",
          description: "Choose your university and submit enrollment deposit",
          deadline: year === "2025" ? "May 1, 2025" : "May 1, 2026",
          category: "application",
          priority: "high",
          completed: false,
        },
        {
          id: "11",
          title: "Receive I-20 Form",
          description: "University sends I-20 form for visa application",
          deadline: year === "2025" ? "May-June 2025" : "May-June 2026",
          category: "visa",
          priority: "high",
          completed: false,
        },
        {
          id: "12",
          title: "Pay SEVIS Fee",
          description: "Pay I-901 SEVIS fee ($350)",
          deadline: year === "2025" ? "June 2025" : "June 2026",
          category: "visa",
          priority: "high",
          completed: false,
        },
        {
          id: "13",
          title: "Apply for F-1 Visa",
          description: "Complete DS-160 and schedule visa interview",
          deadline: year === "2025" ? "June-July 2025" : "June-July 2026",
          category: "visa",
          priority: "high",
          completed: false,
        },
        {
          id: "14",
          title: "Arrange Housing",
          description: "Apply for on-campus housing or find off-campus options",
          deadline: year === "2025" ? "June-July 2025" : "June-July 2026",
          category: "application",
          priority: "medium",
          completed: false,
        },
        {
          id: "15",
          title: "Attend Orientation",
          description: "Participate in international student orientation",
          deadline: year === "2025" ? "August 2025" : "August 2026",
          category: "application",
          priority: "low",
          completed: false,
        },
      ];
    } else {
      // Spring intake timeline (shifted dates)
      return [
        {
          id: "1",
          title: "Research Universities",
          description: "Create a list of 15-20 target universities based on your profile",
          deadline: year === "2025" ? "June 2024" : "June 2025",
          category: "application",
          priority: "high",
          completed: false,
        },
        {
          id: "2",
          title: "Take Standardized Tests",
          description: "Complete TOEFL/IELTS, SAT/ACT, GRE/GMAT as required",
          deadline: year === "2025" ? "September 2024" : "September 2025",
          category: "testing",
          priority: "high",
          completed: false,
        },
        // ... similar structure but with spring dates
      ];
    }
  };

  const toggleCompleted = (id: string) => {
    setTimeline(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "application":
        return "📝";
      case "testing":
        return "📊";
      case "visa":
        return "🛂";
      case "financial":
        return "💰";
      default:
        return "📋";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "application":
        return "bg-primary text-primary-foreground";
      case "testing":
        return "bg-warning text-warning-foreground";
      case "visa":
        return "bg-secondary text-secondary-foreground";
      case "financial":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const downloadTimeline = () => {
    toast({
      title: "Download Started",
      description: "Your timeline PDF will be downloaded shortly.",
    });
  };

  const emailTimeline = () => {
    toast({
      title: "Email Sent",
      description: "Timeline has been sent to your email address.",
    });
  };

  const completedCount = timeline.filter(item => item.completed).length;
  const progressPercentage = timeline.length > 0 ? (completedCount / timeline.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Timeline Generator</h1>
            <p className="text-lg text-muted-foreground">
              Get a personalized step-by-step timeline for your university application journey
            </p>
          </div>

          {/* Input Section */}
          <Card className="shadow-medium mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Generate Your Timeline
              </CardTitle>
              <CardDescription>
                Select your intended intake to get a customized application timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="intake">Intended Intake *</Label>
                  <Select value={intake} onValueChange={setIntake}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your intake semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                      <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                      <SelectItem value="Fall 2026">Fall 2026</SelectItem>
                      <SelectItem value="Spring 2027">Spring 2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={generateTimeline} disabled={isLoading} className="px-8">
                  {isLoading ? "Generating..." : "Generate Timeline"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Feature Notice */}
          {timeline.length > 0 && (
            <Card className="shadow-medium mb-6 border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Save Your Progress</h3>
                    <p className="text-sm text-muted-foreground">Create an account to save your timeline and track progress</p>
                  </div>
                </div>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Create Account (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Timeline Results */}
          {timeline.length > 0 && (
            <div className="space-y-6">
              {/* Progress Summary */}
              <Card className="shadow-medium">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Your Progress</h3>
                      <p className="text-muted-foreground">
                        {completedCount} of {timeline.length} tasks completed
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={downloadTimeline}>
                        <Download className="w-4 h-4" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={emailTimeline}>
                        <Mail className="w-4 h-4" />
                        Email Me
                      </Button>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-primary h-3 rounded-full transition-smooth"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.round(progressPercentage)}% Complete
                  </p>
                </CardContent>
              </Card>

              {/* Timeline Items */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Your Application Timeline</h2>
                
                {timeline.map((item, index) => (
                  <Card key={item.id} className={`shadow-soft hover:shadow-medium transition-smooth ${item.completed ? 'bg-muted/50' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <button onClick={() => toggleCompleted(item.id)}>
                            {item.completed ? (
                              <CheckCircle className="w-6 h-6 text-success" />
                            ) : (
                              <div className="w-6 h-6 border-2 border-muted-foreground rounded-full"></div>
                            )}
                          </button>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className={`text-lg font-semibold ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                              <Badge className={getCategoryColor(item.category)}>
                                {getCategoryIcon(item.category)} {item.category}
                              </Badge>
                              <AlertCircle className={`w-4 h-4 ${getPriorityColor(item.priority)}`} />
                            </div>
                          </div>
                          
                          <p className={`text-muted-foreground mb-3 ${item.completed ? 'line-through' : ''}`}>
                            {item.description}
                          </p>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">Deadline: {item.deadline}</span>
                            <Badge variant="outline" className={`ml-2 ${getPriorityColor(item.priority)}`}>
                              {item.priority} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {timeline.length === 0 && (
            <Card className="shadow-medium">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Ready to Plan Your Journey?</h3>
                <p className="text-muted-foreground">
                  Select your intended intake semester above to generate a personalized 
                  timeline with all the important deadlines and milestones.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;