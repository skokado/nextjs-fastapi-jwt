from sys import prefix
from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app import schemas
from app.models import get_db, User
from app import oauth2

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


router = APIRouter(prefix='/api')

protected_router = APIRouter(
    dependencies=[Depends(oauth2.oauth2_scheme)]
)

@protected_router.get('/')
def hello():
    return {'msg': 'ok'}


auth_router = APIRouter()


@auth_router.post("/login", response_model=schemas.Token)
async def login_for_access_token(
    request: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = oauth2.authenticate_user(db, request.username, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = oauth2.create_access_token(
        data={"sub": user.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}


@protected_router.get('/me', response_model=schemas.ShowUser)
async def show_me(user: User = Depends(oauth2.get_current_user)):
    return user


router.include_router(auth_router)
router.include_router(protected_router)

app.include_router(router)
