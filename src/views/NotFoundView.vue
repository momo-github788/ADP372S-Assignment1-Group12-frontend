<template>
   <div class="container text-center">
        <div class="error-code">404</div>
        <div class="error-message">Not Found</div>
        <div class="back-link"><a href="/" class="btn btn-primary">Go back to the homepage</a></div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
        body {
            background-color: #f5f5f5;
        }

        .container {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .error-code {
            font-size: 120px;
            font-weight: bold;
            color: #333;
        }

        .error-message {
            font-size: 24px;
            color: #555;
        }

        .back-link {
            margin-top: 20px;
        }
</style>