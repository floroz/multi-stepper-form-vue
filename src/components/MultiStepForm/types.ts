export enum JSFramework {
  React = "react",
  Vue = "vue",
  Angular = "angular",
  HTMLCSS = "htmlcss",
}

export enum SkillLevel {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
  Expert = "expert",
}

export type SignupFormData = {
  fullName: string;
  email: string;
  phone: string;
  skillLevel: SkillLevel;
  frameworks: JSFramework[];
  portfolio: string;
};
