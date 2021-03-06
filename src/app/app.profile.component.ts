import {Component,Input,OnInit,EventEmitter,ViewChild,trigger,state,transition,style,animate,Inject,forwardRef} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './app.component';
import {AuthService} from "./auth/auth.service";
import {IUserProfile} from "./common/IUserProfile";

@Component({
    selector: 'inline-profile',
    template: `
        <div class="profile" [ngClass]="{'profile-expanded':active}">
            <div class="profile-image"></div>
            <a href="#" (click)="onClick($event)">
                <span class="profile-name">Carlos Calderon</span>
                <i class="material-icons">keyboard_arrow_down</i>
            </a>
        </div>

        <ul class="ultima-menu profile-menu" [@menu]="active ? 'visible' : 'hidden'">
            <li role="menuitem">
                <a href="http://fullstackcorner.com/author/cdcalderon/" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">person</i>
                    <span>Profile</span> : Full Stack Corner
                </a>
            </li>
            <li role="menuitem">
                <a href="https://github.com/cdcalderon" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">security</i>
                    <span>Github</span>
                </a>
            </li>
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">settings_application</i>
                    <span>Settings</span>
                </a>
            </li>
            <li (click)="auth.logout()"  *ngIf="auth.isAuthenticated()" role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">power_settings_new</i>
                    <span>Logout</span>
                </a>
            </li>
            <li *ngIf="!auth.isAuthenticated()" role="menuitem">
                <a (click)="auth.login()" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">power_settings_new</i>
                    <span>Login</span>
                </a>
            </li>
        </ul>
    `,
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class InlineProfileComponent implements OnInit{

    active: boolean;
    profile: IUserProfile;

    constructor(public auth: AuthService) {
        auth.handleAuthentication();
    }

    ngOnInit() {
        //this.profile = this.auth.profile;
        let appProfileComponent = this;
        this.auth.profileUpdated.subscribe(
            (profile) => {
                appProfileComponent.profile = this.auth.getProfile();
            }
        )
    }

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
}