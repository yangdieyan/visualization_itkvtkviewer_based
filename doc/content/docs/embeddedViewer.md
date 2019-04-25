title: Embedded Viewer
---

ITK/VTK Image Viewer can be used within an existing web site as a library to embed interactive 3D visualization using remote datasets.
To do so a container elements should be created for that view inside your current HTML content like follow.

```html
<div class="itk-vtk-viewer" />
```

Moreover, the JavaScript library should also be added to the web page. Only one of the following is required

```html
<script type="text/javascript" src="https://kitware.github.io/itk-vtk-viewer/app/itkVtkViewer.js">
```

or

```html
<script type="text/javascript" src="https://unpkg.com/itk-vtk-viewer/dist/itkVtkViewer.js">
```

### Viewer configuration

The container `<div/>` can be extended with the following set of attributes:

- (Mandatory) __data-url__="/data/005_36months_T2_RegT1_Reg2Atlas_ManualBrainMask_Stripped.nrrd"
- (Optional) __data-viewport__="300x200" | default is 500x500
- (Optional) __data-background-color__="00aa00" | default is black
- (Optional) __data-slice__="true"


![ItkVtkViewer-embedded](./embeddedViewer.jpg)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>

    [...]

    <div
      style="float: right; display: inline-block; border: 2px solid gray; margin: 20px;"
      class="itk-vtk-viewer"
      data-url="/data/005_36months_T2_RegT1_Reg2Atlas_ManualBrainMask_Stripped.nrrd"
      data-viewport="300x200"
    ></div>

    [...]

    <div
      style="float: left; display: inline-block; border: 2px solid gray; margin: 20px;"
      class="itk-vtk-viewer"
      data-url="/data/005_20months_T2_Reg2Atlas.nrrd"
      data-viewport="400x400"
      data-background-color="ffffff"
    ></div>

    [...]

    <script type="text/javascript" src="itkVtkViewer.js">
    </script>
  </body>
</html>
```
