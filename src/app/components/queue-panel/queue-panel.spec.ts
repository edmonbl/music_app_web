import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuePanel } from './queue-panel';

describe('QueuePanel', () => {
  let component: QueuePanel;
  let fixture: ComponentFixture<QueuePanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueuePanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueuePanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
