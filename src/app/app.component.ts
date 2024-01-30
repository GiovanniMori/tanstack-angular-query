import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { injectMutation, injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { TodoService } from './todo.service';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient)

  query = injectQuery(() => ({
    queryKey: ['repoData'],
    queryFn: () =>
      lastValueFrom(
        this.http.get<Response>('https://api.github.com/repos/tanstack/query'),
      ),
  }))
}

type Response = {
  name: string
  description: string
  subscribers_count: number
  stargazers_count: number
  forks_count: number
}