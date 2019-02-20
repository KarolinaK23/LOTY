import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export abstract class InputAbstract<T> implements OnInit {
    @Input() label: string;
    @Input() value: T;
    @Input() disabled: boolean;
    @Input() ownNameClass: string;
    @Output() valueChange: EventEmitter<T> = new EventEmitter<T>();

    public ngOnInit() {}

    public onChange(): void {
        this.valueChange.emit(this.value);
    }
}
