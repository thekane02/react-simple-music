# sử dụng 1 image node đã có sẵn
FROM node:lts-hydrogen

# thiết lập thư mục làm việc
WORKDIR /app

# copy package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# cài đặt các gói phụ thuộc trong package.json
RUN yarn install

# copy toàn bộ mã nguồn của app vào thư mục làm việc
COPY . .

# build ứng dụng React
# RUN yarn build

# chỉ định port sẽ được sử dụng
EXPOSE 3006

# thiết lập lệnh "start" cho container
CMD ["npm", "start"]