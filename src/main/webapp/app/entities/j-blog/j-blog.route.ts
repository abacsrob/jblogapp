import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JBlog } from 'app/shared/model/j-blog.model';
import { JBlogService } from './j-blog.service';
import { JBlogComponent } from './j-blog.component';
import { JBlogDetailComponent } from './j-blog-detail.component';
import { JBlogUpdateComponent } from './j-blog-update.component';
import { JBlogDeletePopupComponent } from './j-blog-delete-dialog.component';
import { IJBlog } from 'app/shared/model/j-blog.model';

@Injectable({ providedIn: 'root' })
export class JBlogResolve implements Resolve<IJBlog> {
    constructor(private service: JBlogService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((jBlog: HttpResponse<JBlog>) => jBlog.body));
        }
        return of(new JBlog());
    }
}

export const jBlogRoute: Routes = [
    {
        path: 'j-blog',
        component: JBlogComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jblogappApp.jBlog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'j-blog/:id/view',
        component: JBlogDetailComponent,
        resolve: {
            jBlog: JBlogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jblogappApp.jBlog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'j-blog/new',
        component: JBlogUpdateComponent,
        resolve: {
            jBlog: JBlogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jblogappApp.jBlog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'j-blog/:id/edit',
        component: JBlogUpdateComponent,
        resolve: {
            jBlog: JBlogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jblogappApp.jBlog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jBlogPopupRoute: Routes = [
    {
        path: 'j-blog/:id/delete',
        component: JBlogDeletePopupComponent,
        resolve: {
            jBlog: JBlogResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jblogappApp.jBlog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
