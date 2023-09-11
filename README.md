#### Create a JWT Secret to share cross services

``` bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=hijack
```