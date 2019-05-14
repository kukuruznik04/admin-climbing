import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../../../shared/services/upload.service';
import News from '../../../shared/classes/news';
import { NewsService } from '../../../shared/services/news.service';

declare const $: any;

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit, AfterViewInit {
    @ViewChild('inputFile') inputFile: ElementRef;

    slug: string;
    news: News = new News();
    dataModel: any;

  constructor(private newsService: NewsService,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              private router: Router) { }

  ngOnInit() {
      this.slug = this.route.snapshot.params['id'];
      if (this.slug) {
        this.newsService.get(this.slug).subscribe((res: {data: News}) => {
            console.log(res);
            this.news = res.data;
        });
      }
  }

  ngAfterViewInit() {
      $(this.inputFile.nativeElement).on('change', event => {
          const inputFile = event.target.files[0];
          if (!inputFile || !inputFile.name) {
              return;
          }
          console.log(inputFile);
          this.uploadService.post(inputFile).subscribe((res: {location: string}) => {
              this.news.logo = res.location;
              console.log(res);
          });
      });
  }

  submit() {
      console.log(this.dataModel);
      if (this.slug) {
          this.newsService.update(this.slug, this.news).subscribe((res) => {
              this.router.navigateByUrl('/admin/news-table');
              console.log(res);
          });
      } else {
          this.newsService.post(this.news).subscribe((res) => {
              this.router.navigateByUrl('/admin/news-table');
              console.log(res);
          });
      }
  }

}
