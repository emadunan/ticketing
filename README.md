#### Create a JWT Secret to share cross services

``` bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=hijack
```

#### Publish common package to npm 

``` bash
npm publish --access public
```

#### Forward NATS Client and Monitor ports

``` bash
kubectl port-forward nats-pod-name 8222:8222
kubectl port-forward nats-pod-name 4222:4222
```