/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { Resource } from "src/app/common/enums";
import { NavigationConfig } from "src/app/common/interfaces";
import { LocaleKeys } from "src/app/common/constants";
import { NavigationStateModel } from "./navigation-state.interface";


export class NavigationConfigHelper {
  static createDefault(): NavigationStateModel {
    return {
      resource: Resource.NONE,
      list: [],
      isLoaded: false,
      current: {
        parent: this.firstItem,
        child: null
      },
    };
  }

  static createList(): NavigationConfig[] {
    return [
      // {
      //   uid: 1,
      //   pid: 0,
      //   title: LocaleKeys.titles.dashboard,
      //   description: LocaleKeys.titles.dashboard,
      //   route: '',
      //   resource: Resource.DASHBOARD,
      //   icon: ''
      // },
      // {
      //   uid: 10,
      //   pid: 0,
      //   title: LocaleKeys.titles.settings,
      //   description: LocaleKeys.titles.settings,
      //   route: 'settings',
      //   resource: Resource.SETTINGS,
      //   icon: ''
      // },
      // {
      //   uid: 20,
      //   pid: 0,
      //   title: LocaleKeys.titles.helps,
      //   description: LocaleKeys.titles.helps,
      //   route: 'helps',
      //   resource: Resource.HELPS,
      //   icon: ''
      // },
      // {
      //   uid: 30,
      //   pid: 0,
      //   title: LocaleKeys.titles.registration,
      //   description: LocaleKeys.titles.registration,
      //   route: 'registrations',
      //   resource: Resource.REGISTRATION,
      //   icon: 'group-add-filled',
      //   child: [
      //     {
      //       uid: 31,
      //       pid: 30,
      //       title: LocaleKeys.titles.studentRegistration,
      //       description: LocaleKeys.titles.studentRegistration,
      //       route: 'registrations/student',
      //       resource: Resource.STUDENT_REGISTRATION,
      //       icon: 'person-add'
      //     },
      //     {
      //       uid: 32,
      //       pid: 30,
      //       title: LocaleKeys.titles.teacherRegistration,
      //       description: LocaleKeys.titles.teacherRegistration,
      //       route: 'registrations/teacher',
      //       resource: Resource.TEACHER_REGISTRATION,
      //       icon: 'person-add'
      //     },
      //     {
      //       uid: 33,
      //       pid: 30,
      //       title: LocaleKeys.titles.staffRegistration,
      //       description: LocaleKeys.titles.staffRegistration,
      //       route: 'registrations/staff',
      //       resource: Resource.STAFF_REGISTRATION,
      //       icon: 'person-add'
      //     }
      //   ]
      // },
      // {
      //   uid: 40,
      //   pid: 0,
      //   title: LocaleKeys.titles.students,
      //   description: LocaleKeys.titles.students,
      //   route: 'students',
      //   resource: Resource.STUDENTS,
      //   icon: 'student-filled'
      // },
      // {
      //   uid: 50,
      //   pid: 0,
      //   title: LocaleKeys.titles.teachers,
      //   description: LocaleKeys.titles.teachers,
      //   route: 'teachers',
      //   resource: Resource.TEACHERS,
      //   icon: 'teacher-filled'
      // },
      // {
      //   uid: 60,
      //   pid: 0,
      //   title: LocaleKeys.titles.staff,
      //   description: LocaleKeys.titles.staff,
      //   route: 'staff',
      //   resource: Resource.STAFF,
      //   icon: 'staff-filled'
      // },
      // {
      //   uid: 70,
      //   pid: 0,
      //   title: LocaleKeys.titles.classes,
      //   description: LocaleKeys.titles.classes,
      //   route: 'classes-section',
      //   resource: Resource.CLASSES_SECTION,
      //   icon: 'class-room-filled',
      //   child: [
      //     {
      //       uid: 71,
      //       pid: 70,
      //       title: LocaleKeys.titles.classes,
      //       description: LocaleKeys.titles.classes,
      //       route: 'classes-section/classes',
      //       resource: Resource.CLASSES,
      //       icon: 'class'
      //     },
      //     {
      //       uid: 72,
      //       pid: 70,
      //       title: LocaleKeys.titles.subjects,
      //       description: LocaleKeys.titles.subjects,
      //       route: 'classes-section/subjects',
      //       resource: Resource.SUBJECTS,
      //       icon: 'menu-book'
      //     },
      //     {
      //       uid: 73,
      //       pid: 70,
      //       title: LocaleKeys.titles.categories,
      //       description: LocaleKeys.titles.categories,
      //       route: 'classes-section/class-categories',
      //       resource: Resource.CLASS_CATEGORIES,
      //       icon: 'collections-bookmark'
      //     },
      //   ]
      // }
    ];
  }

  static get firstItem(): NavigationConfig {
    return this.createList()[0];
  }
}