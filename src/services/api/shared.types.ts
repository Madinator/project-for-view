import { User } from './users';
type Position = [number, number];
type MapMarker = {
  position: Position;
  title: string;
  ID: number;
};
enum includeTypes {
  cabinets = 'cabinets',
  records = 'records',
  moderates = 'moderates',
  role = 'role',
  currentCabinet = 'currentCabinet',
  cities = 'cities',
}

type Pagination = {
  page: number;
  pages: number;
};

type Filter = Record<string, any>[];

type City = {
  CreatedAt: string;
  ID: number;
  name: string;
  UpdatedAt: string;
  users?: User[] | null;
};
type Point = {
  address: string;
  CreatedAt: string;
  ID: number;
  lat: number;
  lon: number;
  UpdatedAt: string;
};
type Answer = {
  CreatedAt: string;
  ID: number;
  text: string;
  UpdatedAt: string;
  valid: true;
};
type CreateAnswerDTO = {
  text: string;
  valid: boolean;
};
type Question = {
  active: true;
  answers?: Answer[] | null;
  cabinet?: Cabinet | null;
  type?: QuestionType | null;
  CreatedAt: string;
  ID: number;
  tag: string;
  text: string;
  UpdatedAt: string;
  weight: number;
};

type QuestionType = {
  access_level: number;
  CreatedAt: string;
  ID: number;
  name: string;
  UpdatedAt: string;
};

type RecordU = {
  CreatedAt: string;
  duration: number;
  ID: number;
  path: string;
  point?: Point;
  size: number;
  moderate?: ModerateRecord;
  owner?: User;
  cabinet?: Cabinet;
  UpdatedAt: string;
};
type RecordAnswers = {
  answer: Answer;
  answer_id: number;
  CreatedAt: string;
  ID: number;
  question: Question;
  question_id: number;
  UpdatedAt: string;
};
type ModerateRecord = {
  cabinet_id: number;
  cheating: true;
  comment: string;
  CreatedAt: string;
  ID: number;
  moderator_id: number;
  record: RecordU;
  record_answers?: RecordAnswers[] | null;
  record_id: number;
  remoderate: boolean;
  success_deal: boolean;
  attention: boolean;
  total_weight: number;
  UpdatedAt: string;
  weight: number;
};

type Cabinet = {
  active: true;
  CreatedAt: string;
  cron_days: number;
  ID: number;
  license: string;
  moderates?: ModerateRecord[] | null;
  name: string;
  questions?: Question[] | null;
  records?: RecordU[] | null;
  UpdatedAt: string;
  users?: User[] | null;
};
type Agency = {
  name: string;
};

export { includeTypes };
