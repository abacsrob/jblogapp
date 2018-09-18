import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IJBlog } from 'app/shared/model/j-blog.model';

type EntityResponseType = HttpResponse<IJBlog>;
type EntityArrayResponseType = HttpResponse<IJBlog[]>;

@Injectable({ providedIn: 'root' })
export class JBlogService {
    private resourceUrl = SERVER_API_URL + 'api/j-blogs';

    constructor(private http: HttpClient) {}

    create(jBlog: IJBlog): Observable<EntityResponseType> {
        return this.http.post<IJBlog>(this.resourceUrl, jBlog, { observe: 'response' });
    }

    update(jBlog: IJBlog): Observable<EntityResponseType> {
        return this.http.put<IJBlog>(this.resourceUrl, jBlog, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IJBlog>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IJBlog[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
