
export interface TraitItem {
  id: string;
  text: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: TraitItem[];
  vocabulary: string[];
}

export interface UserRating {
  itemId: string;
  score: number; // 1-5
}

export interface UserSelections {
  ratings: Record<string, number>;
  selectedVocabulary: Record<string, string[]>;
  topStrengthId: string | null;
  story: string;
}
