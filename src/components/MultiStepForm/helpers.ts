import { JSFramework, type SignupFormData } from "./types";

// Helper to get framework display names
export const getFrameworkDisplayName = (framework: JSFramework): string => {
  const names: Record<JSFramework, string> = {
    [JSFramework.React]: "React",
    [JSFramework.Vue]: "Vue",
    [JSFramework.Angular]: "Angular",
    [JSFramework.HTMLCSS]: "HTML/CSS",
  };
  return names[framework] || framework;
};

export const mapFormKeyToTitle = (k: keyof SignupFormData): string => {
  const dict: Record<keyof SignupFormData, string> = {
    email: "Email Address",
    fullName: "Full Name",
    phone: "Phone Number",
    portfolio: "Portfolio/GitHub Link",
    skillLevel: "Skill Level",
    frameworks: "Technology Choices",
  };

  return dict[k];
};

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}
