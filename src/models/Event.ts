export class Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  capacity: number;
  finished: boolean;
  private registrationsCount: number;

  constructor(
    id: number,
    title: string,
    description: string,
    date: Date,
    location: string,
    category: string,
    capacity: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.location = location;
    this.category = category;
    this.capacity = capacity;
    this.registrationsCount = 0;
    this.finished = false;
  }

  getRemainingPlaces(): number {
    return Math.max(0, this.capacity - this.registrationsCount);
  }

  isFull(): boolean {
    return this.registrationsCount >= this.capacity;
  }

  isPast(): boolean {
    const now = new Date();
    const eventDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return eventDate.getTime() < today.getTime();
  }

  markFinished(value: boolean) {
    this.finished = value;
  }

  isFinished(): boolean {
    return this.finished;
  }

  addRegistration(): void {
    if (!this.isFull()) this.registrationsCount += 1;
  }
}
