import { Component, OnInit } from '@angular/core';
import { StaticPageService } from '../../shared/services/static-page.service';
import StaticPage from '../../shared/classes/static-page';
import { Router } from '@angular/router';
import { GeneralHelper } from '../../shared/helpers/general.helper';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';
import { Deferred } from 'ng2-smart-table/lib/helpers';

@Component({
  selector: 'app-static-page-table',
  templateUrl: './static-page-table.component.html',
  styleUrls: ['./static-page-table.component.scss']
})
export class StaticPageTableComponent implements OnInit {

    staticPages: StaticPage[];

    settings;
    source: LocalDataSource;

  constructor(private staticPageService: StaticPageService,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
      this.staticPageService.list().subscribe((res: {data: StaticPage[]}) => {
          this.staticPages = GeneralHelper.isEmpty(res) ? [] : res.data;
          this.source = new LocalDataSource(this.staticPages);
      });

      this.settings = {
          actions: {add: false, edit: false, delete: true},
          delete: {
              confirmDelete: true,
          },
          add: {
              confirmCreate: true,
          },
          edit: {
              confirmSave: true,
          },
          columns: {
              name: {
                  title: 'Имя'
              },
              author: {
                  title: 'Автор'
              },
              created_at: {
                  title: 'Создана',
                  editable: false,
                  valuePrepareFunction: (date) => {
                      if (date) {
                          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
                      }
                      return '';
                  },
                  filterFunction: (date, str) => {
                      if (date) {
                          return this.datePipe.transform(new Date(date), 'dd MMM yyyy').includes(str);
                      }
                      return false;
                  }
              }
          }
      };
  }

  select(s: {data: StaticPage}) {
      this.router.navigateByUrl('/admin/static-page/' + s.data.slug);
      console.log(s);
  }

    onDeleteConfirm(event: {confirm: Deferred, data: StaticPage}) {
        console.log(event);
        this.staticPageService.delete(event.data.slug).subscribe((res) => {
            console.log(res);
            event.confirm.resolve();
        }, () => {
            event.confirm.reject();
        });
    }

}
