﻿using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System.Net;

namespace SysTicket.API.Filters
{
    public class ValidationFailureExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is ValidationException validationFailureException)
            {
                string errorsHtml = string.Join("<br/>", validationFailureException.Errors);

                context.ExceptionHandled = true;

                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                context.Result = new JsonResult(
                    JsonConvert.SerializeObject(new
                    {
                        errors = errorsHtml
                    })
                );
            }
        }
    }
}