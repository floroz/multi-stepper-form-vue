export type SignupFormData = {
  fullName: string;
  email: string;
  phone: string;
  portfolio: string;
  framework: JSFramework;
  skillLevel: SkillLevel;
};
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
