# YaRG - YaRG ain't a Resume Generator.

A resume generator inspired by JSON Resume and [resume-schema](https://github.com/jsonresume/resume-schema), but using [grunt](http://gruntjs.com/) and [YAML](http://yaml.org/)

## Install

```
git clone https://github.com/psicomante/yarg-boilerplate
cd yarg-boilerplate
npm install
```

## Convert you JSON Resume to a YAML Resume

edit `config.yml`

add a object under `presets`, for example the file `_resume_orig.json` located the relative folder `../resumes`.

```
  default_json:
    file: _resume_orig.json
    folder: ../resumes
```

save it and run 

```
grunt convert:default_json
```

you will find in your folder a file named _resume_orig.yml

You can also simply run

```
node convertJSONtoYAML ../resumes/_resume_orig.json
```

## Acknowledgements 

* [jsonresume](https://jsonresume.org)
* [jsonresume-theme-boilerplate](https://www.npmjs.org/package/jsonresume-theme-boilerplate)

## License

Available under [the MIT license](http://mths.be/mit).
