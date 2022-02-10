from sqlalchemy.orm import Session

from app.models import User, SessionLocal


def create_sample_user():
    from app.oauth2 import get_password_hash

    users = [
        User(username='admin',
             hashed_password=get_password_hash('admin')),
        User(username='admin2',
             hashed_password=get_password_hash('admin2')),
    ]
    
    for user in users:
        db: Session = SessionLocal()
        db.add(user)
        try:
            db.commit()
        except:
            pass
        else:
            db.refresh(user)
            print(user)
        finally:
            db.close()


if __name__ == '__main__':
    create_sample_user()
