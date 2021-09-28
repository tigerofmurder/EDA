import vtk


cube=vtk.vtkCubeSource()
cube.SetXLength(40)
cube.SetYLength(40)
cube.SetZLength(40)
cube.SetCenter(0,0,0)
cubeMapper=vtk.vtkPolyDataMapper()
cubeMapper.SetInputConnection(cube.GetOutputPort())


cubeActor=vtk.vtkActor()
cubeActor.GetProperty().SetColor(0.5,0.5,0.5)
cubeActor.GetProperty().SetOpacity(0.5)
cubeActor.SetMapper(cubeMapper)


ren = vtk.vtkRenderer()
ren.AddActor(cubeActor)

renWin = vtk.vtkRenderWindow()
renWin.AddRenderer(ren)
renWin.SetSize(600, 600)
iren = vtk.vtkRenderWindowInteractor()
iren.SetRenderWindow(renWin)
ren.SetBackground(0,0,0)
renWin.Render()
iren.Start()
