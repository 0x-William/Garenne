import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Blog } from '../../models/models';
import { ApiService } from '../../providers/api.service';
import { BlogPage } from '../blog/blog';

@Component({
  selector: 'page-bloglist',
  templateUrl: 'bloglist.html'
})
export class BlogListPage {

  loading: boolean;
  blogs: Array<Blog> = [];

  constructor(private navCtrl: NavController, private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getBlogList()
      .then(data => {
        this.loading = false;
        this.blogs = data;
      })
  }

  goBlog(blogId: number) {
    this.navCtrl.setRoot(BlogPage, { blogId });
  }

}
