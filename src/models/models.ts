export class MapPoint {
  sortorder: number;
  title: string;
}

export class Event {
  hour: string;
  fullhour: string;
  name: string;
  number: number;
}

export class Blog {
  title: string;
  slug: string;
  content: string;
  path: string;
}

export class Animal {
  name: string;
  content: string;
}

export class Beacon {
  name: string;
  uuid: string;
  threshold: number;
  threshold_apple: number;
  threshold_android: number;
  question: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  information: string;
  correct: number;
  isActive: boolean;
}
