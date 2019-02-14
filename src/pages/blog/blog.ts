import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiService } from '../../providers/api.service';
import { Blog } from '../../models/models';
import { BlogListPage } from '../bloglist/bloglist';

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class BlogPage {

  blogId: number;
  blog: Blog;

  html: any;

  constructor(private navCtrl: NavController, private navParam: NavParams, private api: ApiService) {
    this.blogId = this.navParam.get('blogId') || 0;
    this.blog = this.api.getBlog(this.blogId);
    this.blog.content = this.blog.content.replace('src="//www.youtube.com', 'src="https://www.youtube.com');
  }

  goNextBlog() {
    this.navCtrl.setRoot(BlogPage, { blogId: this.blogId + 1 });
  }

  goReturn() {
    this.navCtrl.setRoot(BlogListPage);
  }

}
