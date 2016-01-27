<%@ WebHandler Language="VB" Class="json" %>

Imports System
Imports System.Web

Public Class json : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim path As String = context.Request.RequestContext.RouteData().Values("content")
        
        If path Is Nothing Then
            context.Response.Close()
        Else
            Dim page As DontPanicFilms.Pages.Page = DontPanicFilms.Pages.Page.Find(path)
            If page Is Nothing Then
                context.Response.Close()
            Else
                context.Response.ContentType = "text/json"
                context.Response.Write("{""title"":""" & Fix(page.Title) & """,""content"":""" & Fix(page.Content) & """}")
            End If
        End If
    End Sub
    
    
    Private Shared Function Fix(ByVal s As String) As String
        Return s.Replace(vbCrLf, String.Empty).Replace("""", "\""").Replace(vbCr, "\n").Replace(vbLf, "\n").Replace("\'", "\\'")
    End Function
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class