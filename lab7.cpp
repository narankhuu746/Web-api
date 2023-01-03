#include<iostream>
#include<string.h>
#include<cstdlib>
using namespace std;
class Person{
    protected:
        char *fname;
        char *lname;
        char *ssn;
        char *sex;
    public:
        Person(){
            this->fname = new char[10];
            this->lname = new char[10];
            this->ssn = new char[10];
            this->sex = new char[10];
            strcpy(this->fname, "fname");
            strcpy(this->lname, "lname");
            strcpy(this->ssn, "ssn");
            strcpy(this->sex, "sex");
            
        }
        Person(char *fname, char *lname, char *ssn, char *sex){
            this->fname = new char[strlen(fname) + 1];
            this->lname = new char[strlen(lname) + 1];
            this->ssn = new char[strlen(ssn) + 1];
            this->sex = new char[strlen(sex) + 1];
            strcpy(this->fname, fname);
            strcpy(this->lname, lname);
            strcpy(this->ssn, ssn);
            strcpy(this->sex, sex);
        }
        ~Person(){
            delete []fname;
            delete []lname;
            delete []ssn;
            delete []sex;
        }
        virtual void showData() = 0;
    
};

class Student : public Person {
    private:
        char *sisiId;
        char *angi;
    public:
        Student():Person(){
            this->sisiId = new char[10];
            this->angi = new char[10];
            strcpy(this->sisiId, "sisiId");
            strcpy(this->angi, "angi");
        }
        Student(char *fname, char *lname, char *ssn, char *sex, char *sisiId, char *angi):Person(fname, lname, ssn, sex){
            this->sisiId = new char[10];
            this->angi = new char[10];
            strcpy(this->sisiId, sisiId);
            strcpy(this->angi, angi);
        }
        ~Student(){
            delete [] sisiId;
            delete [] angi;
        }
        char *get_sisiId(){
            return sisiId;
        }
        char *get_angi(){
            return angi;
        }
        void set_sisiId(char *sisiId){
            delete [] this->sisiId;
            this->sisiId = new char[strlen(sisiId)+1];
            strcpy(this->sisiId, sisiId);
        }
        void set_angi(char *angi){
            delete [] this->angi;
            this->angi = new char[strlen(angi)+1];
            strcpy(this->angi, angi);
        }
        void showData(){
            cout<<this->fname<<" "<<this->lname<<" "<<this->ssn<<" "<<this->sex<<this->sisiId<<" "<<this->angi;
        }
};



int main(){
    Student su1;
    Student su2("nr","nr","nr","nr","nr","nr");
    su1.showData();
    su2.showData();
    cout<<su1.get_angi();
    cout<<su2.get_angi();
}
