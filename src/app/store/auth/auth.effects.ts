import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import * as AuthActions from './auth.actions';
import { AuthService } from "../../services/auth.service";