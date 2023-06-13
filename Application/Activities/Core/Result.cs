using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Activities.Core
{
    public class Result<T>
    {
        public Boolean IsSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        public static Result<T> Success(T Value)=>new Result<T> {IsSuccess=true, Value=Value};
        public static Result<T> Failure(string error )=>new Result<T> {IsSuccess=false, Error=error};
    }
}