import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, DollarSign, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface School {
  id: string;
  name: string;
  location: string;
  state: string;
  ranking: number;
  tuition: number;
  acceptanceRate: number;
  averageGPA: number;
  category: "reach" | "match" | "safety";
  strengths: string[];
}

const SchoolMatcher = () => {
  const [formData, setFormData] = useState({
    gpa: "",
    major: "",
    budget: "",
    location: "",
  });
  const [results, setResults] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Sample university data
  const universities: School[] = [
    {
      id: "1",
      name: "Harvard University",
      location: "Cambridge, MA",
      state: "Massachusetts",
      ranking: 2,
      tuition: 79000,
      acceptanceRate: 3.4,
      averageGPA: 4.18,
      category: "reach",
      strengths: ["Medicine", "Law", "Business"],
    },
    {
      id: "2",
      name: "Stanford University",
      location: "Stanford, CA",
      state: "California",
      ranking: 3,
      tuition: 78000,
      acceptanceRate: 3.9,
      averageGPA: 4.16,
      category: "reach",
      strengths: ["Computer Science", "Engineering", "Business"],
    },
    {
      id: "3",
      name: "University of California, Berkeley",
      location: "Berkeley, CA",
      state: "California",
      ranking: 22,
      tuition: 65000,
      acceptanceRate: 11.6,
      averageGPA: 3.89,
      category: "match",
      strengths: ["Engineering", "Computer Science", "Economics"],
    },
    {
      id: "4",
      name: "University of Michigan",
      location: "Ann Arbor, MI",
      state: "Michigan",
      ranking: 25,
      tuition: 68000,
      acceptanceRate: 18.0,
      averageGPA: 3.85,
      category: "match",
      strengths: ["Engineering", "Business", "Medicine"],
    },
    {
      id: "5",
      name: "University of Washington",
      location: "Seattle, WA",
      state: "Washington",
      ranking: 40,
      tuition: 60000,
      acceptanceRate: 48.0,
      averageGPA: 3.76,
      category: "safety",
      strengths: ["Computer Science", "Medicine", "Engineering"],
    },
    {
      id: "6",
      name: "Boston University",
      location: "Boston, MA",
      state: "Massachusetts",
      ranking: 43,
      tuition: 62000,
      acceptanceRate: 14.0,
      averageGPA: 3.71,
      category: "match",
      strengths: ["Business", "Medicine", "International Relations"],
    },
    {
      id: "7",
      name: "University of Texas at Austin",
      location: "Austin, TX",
      state: "Texas",
      ranking: 38,
      tuition: 55000,
      acceptanceRate: 31.8,
      averageGPA: 3.83,
      category: "safety",
      strengths: ["Engineering", "Business", "Computer Science"],
    },
    {
      id: "8",
      name: "Northeastern University",
      location: "Boston, MA",
      state: "Massachusetts",
      ranking: 49,
      tuition: 59000,
      acceptanceRate: 6.8,
      averageGPA: 3.91,
      category: "match",
      strengths: ["Engineering", "Business", "Computer Science"],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gpa || !formData.major || !formData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const gpa = parseFloat(formData.gpa);
      const budget = parseInt(formData.budget);
      
      let filteredSchools = universities.filter(school => school.tuition <= budget * 1.1);
      
      // Location filter
      if (formData.location && formData.location !== "any") {
        filteredSchools = filteredSchools.filter(school => 
          school.state.toLowerCase() === formData.location.toLowerCase()
        );
      }

      // Categorize schools based on GPA
      const categorizedSchools = filteredSchools.map(school => {
        let category: "reach" | "match" | "safety";
        
        if (gpa < school.averageGPA - 0.2) {
          category = "reach";
        } else if (gpa >= school.averageGPA - 0.1 && gpa <= school.averageGPA + 0.1) {
          category = "match";
        } else {
          category = "safety";
        }
        
        return { ...school, category };
      });

      // Sort by ranking and limit results
      const sortedSchools = categorizedSchools
        .sort((a, b) => a.ranking - b.ranking)
        .slice(0, 8);

      setResults(sortedSchools);
      setIsLoading(false);
    }, 1000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "reach":
        return <TrendingUp className="w-4 h-4" />;
      case "match":
        return <Minus className="w-4 h-4" />;
      case "safety":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "reach":
        return "bg-warning text-warning-foreground";
      case "match":
        return "bg-primary text-primary-foreground";
      case "safety":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">School Matcher</h1>
            <p className="text-lg text-muted-foreground">
              Find universities that match your academic profile and preferences
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-1">
              <Card className="shadow-medium sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Your Profile
                  </CardTitle>
                  <CardDescription>
                    Tell us about your academic background and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="gpa">GPA (4.0 scale) *</Label>
                      <Input
                        id="gpa"
                        type="number"
                        step="0.01"
                        min="0"
                        max="4.0"
                        value={formData.gpa}
                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                        placeholder="e.g., 3.5"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="major">Intended Major *</Label>
                      <Select
                        value={formData.major}
                        onValueChange={(value) => setFormData({ ...formData, major: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your major" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="computer-science">Computer Science</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="medicine">Medicine</SelectItem>
                          <SelectItem value="economics">Economics</SelectItem>
                          <SelectItem value="international-relations">International Relations</SelectItem>
                          <SelectItem value="law">Law</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Annual Budget (USD) *</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="40000">Up to $40,000</SelectItem>
                          <SelectItem value="60000">Up to $60,000</SelectItem>
                          <SelectItem value="80000">Up to $80,000</SelectItem>
                          <SelectItem value="100000">$80,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Preferred Location</Label>
                      <Select
                        value={formData.location}
                        onValueChange={(value) => setFormData({ ...formData, location: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Location</SelectItem>
                          <SelectItem value="california">California</SelectItem>
                          <SelectItem value="massachusetts">Massachusetts</SelectItem>
                          <SelectItem value="new york">New York</SelectItem>
                          <SelectItem value="texas">Texas</SelectItem>
                          <SelectItem value="washington">Washington</SelectItem>
                          <SelectItem value="michigan">Michigan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Finding Schools..." : "Find My Schools"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              {results.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Your School Matches</h2>
                    <Badge variant="outline" className="text-sm">
                      {results.length} schools found
                    </Badge>
                  </div>

                  <div className="grid gap-4">
                    {results.map((school) => (
                      <Card key={school.id} className="hover:shadow-medium transition-smooth">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold mb-2">{school.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {school.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  ${school.tuition.toLocaleString()}/year
                                </div>
                              </div>
                            </div>
                            <Badge className={getCategoryColor(school.category)}>
                              {getCategoryIcon(school.category)}
                              {school.category.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">#{school.ranking}</div>
                              <div className="text-xs text-muted-foreground">US Ranking</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{school.acceptanceRate}%</div>
                              <div className="text-xs text-muted-foreground">Acceptance Rate</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{school.averageGPA}</div>
                              <div className="text-xs text-muted-foreground">Avg GPA</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">${Math.round(school.tuition / 1000)}K</div>
                              <div className="text-xs text-muted-foreground">Annual Cost</div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-2">Strong Programs:</p>
                            <div className="flex flex-wrap gap-1">
                              {school.strengths.map((strength, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="shadow-medium">
                  <CardContent className="p-12 text-center">
                    <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Ready to Find Your Perfect Schools?</h3>
                    <p className="text-muted-foreground">
                      Fill out the form on the left to get personalized university recommendations
                      based on your academic profile and preferences.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolMatcher;