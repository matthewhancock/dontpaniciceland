<%@ Application Language="VB" %>
<%@ Import Namespace="System.Web.Routing" %>

<script runat="server">

    Sub Application_Start(ByVal sender As Object, ByVal e As EventArgs)
        RouteTable.Routes.Add(New Route("json/{*content}", New HttpHandlerRouteHandler("~/_handlers/json.ashx")))
    End Sub
    
    Sub Application_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs on application shutdown
    End Sub
        
    Sub Application_Error(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when an unhandled error occurs
    End Sub

    Sub Session_Start(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when a new session is started
    End Sub

    Sub Session_End(ByVal sender As Object, ByVal e As EventArgs)
        ' Code that runs when a session ends. 
        ' Note: The Session_End event is raised only when the sessionstate mode
        ' is set to InProc in the Web.config file. If session mode is set to StateServer 
        ' or SQLServer, the event is not raised.
    End Sub
       
    Public Class HttpHandlerRouteHandler
        Implements IRouteHandler
        
        Private _VirtualPath As String
        Public Sub New(ByVal VirtualPath As String)
            _VirtualPath = VirtualPath
        End Sub
        Public Function GetHttpHandler(requestContext As System.Web.Routing.RequestContext) As System.Web.IHttpHandler Implements System.Web.Routing.IRouteHandler.GetHttpHandler
            Return Compilation.BuildManager.CreateInstanceFromVirtualPath(Me._VirtualPath, GetType(IHttpHandler))
        End Function
    End Class
</script>