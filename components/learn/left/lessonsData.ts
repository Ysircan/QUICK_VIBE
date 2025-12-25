export type Lesson = {
  id: string;
  title: string;
  time: string;
  outcome: string;
};

export const LESSONS: Lesson[] = [
  {
    id: "html-layout",
    title: "HTML · Layout Control",
    time: "15m",
    outcome:
      "Control the page skeleton (sections/order/button placement). In other words: make it feel like a product.",
  },
  {
    id: "css-style",
    title: "CSS · Style Console",
    time: "12m",
    outcome:
      "Control theme color / buttons / shadow hardness. In other words: make it feel like a brand.",
  },
];
