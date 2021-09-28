#include "CImg.h"
using namespace cimg_library;


CImg<float>  DX(CImg<float> & I)
{
      CImg<float> R(I);

      for(int i=0;i<I.height();i++)
        for(int j=0;j<I.width();j++)
              R(i,j) = I(i+1,j) - I(i,j);
      return R;

}


CImg<float>  DY(CImg<float> & I)
{
      CImg<float> R(I);

      for(int i=0;i<I.height();i++)
        for(int j=0;j<I.width();j++)
              R(i,j) = I(i,j+1) - I(i,j);
      return R;

}



CImg<float>  Gradiente(CImg<float> & dx,CImg<float> & dy)
{
      CImg<float> R(dx);

      for(int i=0;i<dx.height();i++)
        for(int j=0;j<dx.width();j++)
              R(i,j) = sqrt(dx(i,j)* dx(i,j) +  dy(i,j)* dy(i,j));
      return R;

}

int main()
{
  CImg<float> A("foto.pgm");
  A.display();
  CImg<float> dx = DX(A);
  dx.display();
  CImg<float> dy = DY(A);
  dy.display();
  CImg<float> G = Gradiente(dx,dy);
  G.display();

  return 1;
}
