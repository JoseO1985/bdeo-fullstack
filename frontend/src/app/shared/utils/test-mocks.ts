import { BehaviorSubject, of } from 'rxjs'

const beerServiceStub = () => {
  return () => ({
    getAll: jest.fn().mockImplementation(() =>Promise.resolve({
      beers: [],
      totalItems: 0
    }))
  })
}

const toastrServiceStub = () => {
  return () => ({
    error: jest.fn()
  })
}

const routerStub = () => {
  return () => ({
    navigate: jest.fn()
  })
}

const activatedRouteStub = () => {
  return () => ({
    navigate: jest.fn(),
    route: {
      snapshot: {
        queryParams: {
          'key': ''
        }
      }
    }
  })
}

const httpClientServiceStub = () => ({
    post: jest.fn(() => of({}))
})

const userServiceStub = () => ({
    authSub$: {
      next: jest.fn()
    }
})

const loginServiceStub = () => {
    return () => ({
      login: jest.fn(),
      logout: jest.fn()
    })
}

export const generator = {
  beerServiceStub,
  toastrServiceStub,
  routerStub,
  activatedRouteStub,
  userServiceStub,
  httpClientServiceStub,
  loginServiceStub
}
