import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'certificate-detail',
    loadChildren: () =>
      import('./certificate-detail/certificate-detail.module').then(
        (m) => m.CertificateDetailPageModule
      ),
  },
  {
    path: 'add-certificate',
    loadChildren: () =>
      import('./add-certificate/add-certificate.module').then(
        (m) => m.AddCertificatePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
