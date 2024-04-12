## Docker command
Use this command to generate the custom build. Execute the command from the ```opencascade``` folder.

```powershell
docker run --rm -it -v "$(pwd):/src" -u "$(id -u):$(id -g)" donalffons/opencascade.js occt-custom-build.yml
```