import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeightData } from 'src/app/shared/models/weight.model';
@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
  weightGoals: WeightData[] = [];
  editMode = false;
  weightForm: FormGroup;

  @Input() goal: string = '';
  @Output() submit = new EventEmitter<string>();

  customGoals: string[] = [];
  submittedGoals: string[] = [];

  goalForm: FormGroup;

  // cGEdit is for the initial add
  cGEdit: boolean = false;

  // editingCreatedGoal is for updating goals w/ edit button
  editingCreatedGoal: string | null = null;

  tempGoal: string | null = null;

  constructor(private fb: FormBuilder) {
    this.goalForm = this.fb.group({
      goal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadWeight();
    this.loadGoals();

    // WEIGHT FORM
    this.weightForm = this.fb.group({
      _wStart: [this.weightGoals[0]?.wStart, Validators.required],
      _wCurrent: [this.weightGoals[0]?.wCurrent, Validators.required],
      _wGoal: [this.weightGoals[0]?.wGoal, Validators.required],
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.weightGoals = [
      {
        wStart: this.weightForm.value._wStart,
        wCurrent: this.weightForm.value._wCurrent,
        wGoal: this.weightForm.value._wGoal,
      },
    ];

    localStorage.setItem('weightData', JSON.stringify(this.weightGoals));
  }

  private loadWeight() {
    const storedData = localStorage.getItem('weightData');

    if (storedData) {
      this.weightGoals = JSON.parse(storedData);
    } else {
      this.weightGoals = [{ wStart: 0, wCurrent: 0, wGoal: 0 }];
    }
  }

  // CUSTOM GOALS

  private saveGoals() {
    localStorage.setItem('submittedGoals', JSON.stringify(this.submittedGoals));
  }

  private loadGoals() {
    const storedData = localStorage.getItem('submittedGoals');
    if (storedData) {
      this.submittedGoals = JSON.parse(storedData);
    } else {
      this.submittedGoals = [];
    }
  }

  toggleCGEdit() {
    this.cGEdit = !this.cGEdit;
  }

  addCGButton() {
    this.customGoals.push('');
    this.toggleCGEdit();
  }

  onGoalSubmit(goal: string, index: number) {
    this.customGoals[index] = goal;
    this.submittedGoals = this.customGoals.filter((g) => g.trim() !== '');
    this.saveGoals();
  }

  submitGoal() {
    const submittedGoal = this.goalForm.get('goal')?.value;
    if (submittedGoal) {
      this.submit.emit(submittedGoal);
      this.submittedGoals.push(submittedGoal);
      this.cGEdit = false;
      this.goalForm.reset();
      this.saveGoals();
    }
  }

  editCreatedGoal(goal: string) {
    this.editingCreatedGoal = goal;
    this.tempGoal = goal;
  }

  updateCreatedGoal(index: number) {
    if (this.tempGoal !== null) {
      this.submittedGoals[index] = this.tempGoal;

      this.saveGoals();
    }
    this.editingCreatedGoal = null;
    this.tempGoal = null;
  }

  cancelUpdate() {
    this.editingCreatedGoal = null;
    this.tempGoal = null;
  }

  removeCreatedGoal(index: number) {
    const removedGoal = this.submittedGoals[index];

    (this.submittedGoals as string[]).splice(index, 1);
    this.saveGoals();
  }
}
